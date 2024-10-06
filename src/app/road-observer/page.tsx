/**
 * We assume that the API always returns a valid road object.
 * Please use and modify the api/road route to get sample data.
 *  */
const getRoad = async (): Promise<Road> => {
    const data = await fetch("http://localhost:3000/api/road");
    return data.json();
};

const RoadObserverPage = async () => {
    const road = await getRoad();

    return <div></div>;
};

export default RoadObserverPage;
