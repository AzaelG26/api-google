import {Link} from "react-router-dom";
import React from "react"

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps){
    return(
        <>
        <div>
            <header>
                <nav>
                    <ul>
                        <li> <Link to='/login'>Home</Link> </li>
                        <li> <Link to='/signup'>sign up</Link> </li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>
        </>

    );
}