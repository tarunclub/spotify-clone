import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import logo from '../public/logo.png';

export default function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image src={logo} width={100} height={100} alt="logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mt-5">
          <button
            className="bg-[#18D860] text-white p-4 rounded-full font-semibold"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
