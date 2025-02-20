import {NavLink, Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className={"flex justify-start flex-col bg-amber-50 min-h-screen max-h-fit p-2"}>
            <div className={"flex justify-center w-full h-12"}>
                <NavLink to={''} className={"navLink"}>Home</NavLink>
                <NavLink to={'joke'} className={"navLink"}>Joke</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
