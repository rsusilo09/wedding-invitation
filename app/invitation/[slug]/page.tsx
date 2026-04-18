import ClientPage from "./ClientPage";

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const guestName = decodeURIComponent(resolvedParams.slug);

  return <ClientPage guestName={guestName} />;
}