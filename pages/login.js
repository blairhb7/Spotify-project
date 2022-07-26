import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

function Login({ providers }) {
  return (
    <div
      className="text-center h-screen w-screen flex items-center justify-center relative"
      style={{ backgroundColor: 'whitesmoke' }}
    >
      <div className="bg-black w-screen  flex flex-col items-center justify-center min-h-screen">
        <img
          className="h-60 w-60 "
          src="https://links.papareact.com/9xl"
          alt="spotify logo"
        />
        <h1
          className="text-4xl lg:text-9xl md:text-7xl  uppercase font-bold"
          style={{
            color: '#1ed760',
          }}
        >
          Spotify
        </h1>
        

        {Object.values(providers).map((provider) => (
            
          <div
            key={provider.name}
            className=" bg-transparent cursor-pointer"
          >
            <div className="flex p-2 m-2 content-center bg-[#1ed760] rounded-full" style={{ backgroundcolor: '#1ed760' }}>
            <h2 className='text-white uppercase px-6 ' onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              style={{ color: '#fff' }}>Login in </h2>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}