import {NavLink, Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            Main Layout
            <div>
                <NavLink to={''} style={({ isActive }) => ({ backgroundColor: isActive ? '#dfeeab' : '#e6e6e1' })}>Home</NavLink>
                <NavLink to={'joke'} style={({ isActive }) => ({ backgroundColor: isActive ? '#dfeeab' : '#e6e6e1' })}>Joke</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
