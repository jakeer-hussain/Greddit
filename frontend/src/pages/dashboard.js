import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./dashboard.css";
import NavBar from "./navbar";
import PostPage from "./postFeed";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    if (user) {
        return <PostPage />;
    }

    return (
        <>
            <div className="dashboard-background">
                <NavBar />
                <div className="welcomescreendiv">
                    <h1 className="heading">
                        {" "}
                        Welcome to Our <span className="greddit">Greddit</span>{" "}
                    </h1>
                    <p className="quote">
                        {" "}
                        This is the place where you can connect without limits!!!{" "}
                    </p>
                </div>
            </div>
        </>
    );
}