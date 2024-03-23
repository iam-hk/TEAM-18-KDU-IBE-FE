import { useEffect, useState } from "react";
import "./Home.scss";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getTenantConfig } from "../../redux/thunk/GetTenantConfig";
import { SearchForm } from "../../Component/Search/searchForm/SearchForm";
import CircularProgress from "@mui/material/CircularProgress";
interface HomeProps {
  loader: boolean;
}
export function Home({ loader }: HomeProps) {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
  // const [loader, setLoader] = useState(true);
  const reduxDispatch: AppDispatch = useDispatch();
  // useEffect(() => {
  //   reduxDispatch(getTenantConfig()).then(() => setLoader(false));
  // }, []);
  return (
    <div
      className="home"
      style={{ "--banner-image": `url(${bannerImage})` } as React.CSSProperties}
    >
      {loader ? (
        <div className="loader-container">
          <CircularProgress size={100} />
        </div>
      ) : (
        <div className="home-wrapper">
          <SearchForm />
        </div>
      )}
    </div>
  );
}
