import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
3000;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(session){
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    }
  }

  return {
    props: {},
  };
};

export default function Home() {
  function handleSignIn() {
    signIn("github");
  }

  return (
    <>
      <Head>
        <title>Create Next Auth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen bg-slate-600">
        <div className="container bg-white w-1/1 h-screen md:w-1/2 mx-auto grid items-center">
          <header className="mx-auto w-full text-center">
            <h1 className="text-4xl font-bold py-4">Login</h1>
          </header>
          <div className="form p-4 grid gap-4">
            <div className="input-group flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email@email.com"
                className="border border-fuchsia-600 rounded-lg px-4 py-2 text-2xl"
              />
            </div>
            <div className="input-group  flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder=""
                className="border border-fuchsia-600 rounded-lg px-4 py-2 text-2xl"
              />
            </div>
            <div className="input-group  flex flex-col">
              <button className="button border border-rose-400 rounded-lg bg-slate-600 text-neutral-50 text-2xl py-2">
                Entrar
              </button>
            </div>
            <div className="socials flex justify-between g-4">
              <button
                onClick={handleSignIn}
                className="button bg-slate-600 text-white px-4 py-2 rounded-lg"
              >
                Github
              </button>
              <button className="button bg-slate-600 text-white px-4 py-2 rounded-lg">
                Google
              </button>
              <button className="button bg-slate-600 text-white px-4 py-2 rounded-lg">
                Twitter
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
