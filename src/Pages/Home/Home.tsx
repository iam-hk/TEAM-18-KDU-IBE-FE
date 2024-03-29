import "./Home.scss";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { SearchForm } from "../../Component/Search/searchForm/SearchForm";
import CircularProgress from "@mui/material/CircularProgress";
interface HomeProps {
  loader: boolean;
}
export function Home({ loader }: HomeProps) {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
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
