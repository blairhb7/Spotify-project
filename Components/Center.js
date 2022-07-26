
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle} from "lodash"
import { useState, useEffect } from 'react';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
import { signOut } from 'next-auth/react';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-purple-300',
  'from-green-700',
  'from-teal-700',
  'from-orange-700',
];


const Center = () => {
    const { data: session} = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();


    useEffect(() => {
      setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log('Something went wrong!', err));
    }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide select-none relative'>
        <header className='absolute top-5 right-8 '>
            <div className='flex  items-center bg-[#2e2e2e] space-x-3 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full pr-2'
              onClick={signOut}
            >
                <img className='rounded-full w-10 h-10' src={session?.user.image} alt="" />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white pl-5 pb-5 p-8`} >
          <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="album image"/>
          <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
        </section>

        <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center