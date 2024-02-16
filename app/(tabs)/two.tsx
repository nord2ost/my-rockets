import { useSelector } from "react-redux";
import { StoreState } from "../types/StoreState";
import RocketList from "../components/rocketList";

export default function TabTwoScreen() {
  const rockets = useSelector((state: StoreState) => state.rockets.data);
  const favorites = useSelector(
    (state: StoreState) => state.rockets.favorites ?? []
  );
  const favoriteRockets = rockets.filter((r) => {
    return favorites.includes(r.rocket_id);
  });
  return <RocketList rockets={favoriteRockets} />;
}
