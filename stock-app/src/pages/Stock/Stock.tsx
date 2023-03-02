import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router';

const Stock: FC = () => {
    const stockId = useParams();
    
  return (
    <div>
     {stockId.StockId}
    </div>
  )
}

export default Stock;