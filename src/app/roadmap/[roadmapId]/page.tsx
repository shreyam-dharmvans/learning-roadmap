'use client';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import PageEnd from '@/components/PageEnd';
import { Progress } from '@/components/ui/progress';
import { Timeline } from '@/components/ui/timeline';
import useFetchSingleRoadmap from '@/hooks/useFetchSingleRoadmapFromDB';
import useMarkSubtopicAsCompleted from '@/hooks/useMarkSubtopicAsCompleted';
import { Roadmap } from '@/types/roadmap.types';
import { roadmapGraphType } from '@/types/roadmapGraph.types';
import { Section, Subtopic } from '@/types/sections.types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GoLinkExternal } from "react-icons/go";

const page = () => {
    const params = useParams();
    const { roadmapId } = params;
    const [modifiedDataForTimeline, setmodifiedDataForTimeline] = useState<roadmapGraphType[]>([]);
    const [roadmap, setRoadmap] = useState<Roadmap>();
    const [trigger, setTrigger] = useState<boolean>(false);

    const { markSubtopicAsCompleted, loading } = useMarkSubtopicAsCompleted();

    const handleIsCompleted = async (subtopicId: string) => {
        const updatedRoadmap = await markSubtopicAsCompleted(subtopicId, roadmapId as string);
        setRoadmap(updatedRoadmap);
        setTrigger(!trigger);
    }


    const { fetchSingleRoadmapFromDB, loadingRoadmap } = useFetchSingleRoadmap();

    useEffect(() => {

        const fetchSingleRoadmap = async () => {
            const data = await fetchSingleRoadmapFromDB(roadmapId as string)
            const modifiedData = data.sections.map((section: Section) => { // parsing server response to Timeline component prop
                return {
                    title: section.title,
                    content: (
                        <div>
                            {section.subtopics.map((subtopic: Subtopic) => {
                                return <div key={subtopic.title} id={section.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')} className='bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 border-r-4 my-10 p-5 text-left rounded-md flex flex-col sm:flex-row justify-between'>
                                    <div>
                                        <div className='text-lg'><b>{subtopic.title}</b></div>
                                        <div className='text-neutral-400'>
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center gap-2  transition-transform transform hover:scale-100 hover:shadow-2xl hover:translate-x-1 hover:text-blue-600' href={subtopic.resource_link}>
                                                <span>Resources</span>
                                                <span><GoLinkExternal /></span>
                                            </Link></div>
                                    </div>
                                    <div className='mt-5 sm:mt-0'>
                                        <div className=""><span className=' font-semibold'>Duration :</span> {subtopic.duration} days </div>
                                        <div className=''><span className=' font-semibold'>Due Date :</span> {subtopic.due_date?.toString().substring(0, 10)}</div>
                                        {subtopic.is_completed ?
                                            <div>
                                                <span className='text-green-500 font-semibold'>Completed</span>
                                            </div> :
                                            <div>
                                                <button onClick={e => handleIsCompleted(subtopic._id as string)} className='text-gray-700 cursor-pointer'>Mark As Complete</button>
                                            </div>}
                                    </div>
                                </div>
                            })}
                        </div>
                    )
                }
            })

            setRoadmap(data);
            setmodifiedDataForTimeline(modifiedData);

        }

        fetchSingleRoadmap();
    }, [trigger])




    return (
        <div className="w-full flex  flex-col align-middle">
            <Header />
            {(loading || loadingRoadmap) && <Loader />}
            <div className=" sm:w-3/5 flex flex-col mx-auto text-center">
                <div className="text-2xl sm:text-7xl font-bold py-5 text-gradient">
                    {roadmap?.title}
                </div>
            </div>

            <div className='Progress p-5 mx-10 sm:mx-20 justify-center'>
                <p className='text-2xl my-2 font-semibold text-gray-100'>Your Progress : {roadmap?.progress}%</p>
                <div className='flex items-center justify-start '>
                    <Progress className='w-[90%]' value={roadmap?.progress} />
                </div>
            </div>
            <Timeline data={modifiedDataForTimeline} />
            <PageEnd />
        </div>
    );
}

export default page