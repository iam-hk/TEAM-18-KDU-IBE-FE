import { useEffect } from "react";
import "./Home.scss";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getTenantConfig } from "../../redux/thunk/GetTenantConfig";
import { SearchForm } from "../../Component/Search/searchForm/SearchForm";
export function Home() {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTenantConfig());
  }, []);
  return (
    <div
      className="home"
      style={{ "--banner-image": `url(${bannerImage})` } as React.CSSProperties}
    >
      <div className="home-wrapper">
        <SearchForm />
      </div>
    </div>
  );
}
