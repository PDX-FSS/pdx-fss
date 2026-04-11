import { getCommonPageProps } from "../utils/getPageProps";
import ContentPageLayout from "../components/ContentPageLayout";
import getStaticPropsData from "../utils/getStaticPropsHelper";

export default function History({ title, content }) {
  return <ContentPageLayout title={title} content={content} />;
}

export async function getStaticProps() {
  const data = getStaticPropsData("history.md");
  const commonProps = await getCommonPageProps();

  return {
    props: {
      title: data.title,
      content: data.content,
      ...commonProps,
    },
  };
}
