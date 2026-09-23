import { getCommonPageProps } from "../utils/getPageProps";
import ContentPageLayout from "../components/ContentPageLayout";
import StopSuperSpeedersEndorsementForm from "../components/StopSuperSpeedersEndorsementForm";
import getStaticPropsData from "../utils/getStaticPropsHelper";

export default function StopSuperSpeeders({
  title,
  content,
  metaDescription,
  metaImage,
}) {
  return (
    <ContentPageLayout
      title={title}
      content={content}
      description={metaDescription}
      image={metaImage}
    >
      <StopSuperSpeedersEndorsementForm />
    </ContentPageLayout>
  );
}

export async function getStaticProps() {
  const data = getStaticPropsData("stop-super-speeders.md");
  const commonProps = await getCommonPageProps();

  return {
    props: {
      title: data.title ?? null,
      content: data.content ?? null,
      metaDescription: data.metaDescription ?? null,
      metaImage: data.metaImage ?? null,
      ...commonProps,
    },
  };
}
