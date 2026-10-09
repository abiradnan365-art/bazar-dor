import React from 'react';
import IncreasedProducts from './IncreasedProducts';
import DecreasedProducts from './DecreasedProducts';
import AllProducts from './AllProducts';

const Products = () => {
    return (
        <div className="container max-w-6xl mx-auto mt-4">
            
            <IncreasedProducts />
            <DecreasedProducts />
            <AllProducts />
        </div>
    );
};

export default Products;