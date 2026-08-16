interface Props {
  params: Promise<{
    pageSlug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { pageSlug } = await params;
console.log(pageSlug);

  return (
    <div>
     
    </div>
  );
}