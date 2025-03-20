/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import config from "../../config";

function AppHead({ title, description }) {
  const { seo } = config;
  return (
    <Helmet>
      <title>{title ? title : seo.title}</title>
      <meta
        name="description"
        content={description ? description : seo.description}
      />
    </Helmet>
  );
}

export default AppHead;
