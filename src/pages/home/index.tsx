import { signOut, useSession } from "next-auth/react";

// ! Pode ser usado o getServerSideProps ou adicionar o parametro callbackUrl na função signOut...
// ! ...retirando o parametro callbackUrl, a página recarrega sem mudar a url, útil quando se quer que o usuário permaneça na mesma página

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   if(!session){
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {},
//   };
// };

export default function Home() {
  const { data: session, status } = useSession();

  async function handleSignOut() {
    return await signOut({ redirect: true, callbackUrl: "/" });
  }

  return (
    <>
      <button onClick={handleSignOut}>SAIR</button>
      <div>Home</div>
      {status === "unauthenticated" && <p>Vocêe não está logado(a)!</p>}
      {status === "authenticated" && <p>Olá {session?.user?.email}</p>}
    </>
  );
}
