import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import Link from 'next/link';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
];

export default function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.log(error));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        {session ? (
          <div
            className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            onClick={() => signOut()}
          >
            <img
              src={session?.user.image}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex items-center bg-green-500 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-md px-4 py-2">
            <Link href={'/login'}>
              <h2 className="text-lg">Login</h2>
            </Link>
          </div>
        )}
      </header>
      {session ? (
        <div>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
          >
            <img
              src={playlist?.images?.[0]?.url}
              alt=""
              className="h-44 w-44 shadow-2xl"
            />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {playlist?.name}
              </h1>
            </div>
          </section>
          <div>
            <Songs />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
