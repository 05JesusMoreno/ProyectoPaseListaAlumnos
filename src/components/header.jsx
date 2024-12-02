import React from "react";
import logo from '../assets/logo.png';
import sep from '../assets/sep.png';

const Header = () => {
    return (   
        <div className="bg-rose-900 w-full h-16 m-0 p-0">
            <header className="flex items-center justify-between h-full px-4">
                {/* Logo a la izquierda */}
                <img 
                    src={logo} 
                    className="h-12 sm:h-14 w-auto" 
                    alt="Logo" 
                />

                {/* Imagen SEP a la derecha */}
                <img 
                    src={sep} 
                    className="h-12 sm:h-14 w-auto drop-shadow-[0px_0px_5px_white]" 
                    alt="SEP" 
                />
            </header>
        </div>
    );
}

export default Header;
