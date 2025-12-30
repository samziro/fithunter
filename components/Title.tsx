import React from 'react';

interface TitleProps {
    heading: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ heading }) => {
    return (
        <div className='text-4xl font-bold my-4 text-center text-white'>
            {heading}
        </div>
    );
};

export default Title;
