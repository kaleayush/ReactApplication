import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashBoardHandler } from "../store/slices/dashBoardSlice";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import CardDataStats from "../Components/CardDataStats";
import productImage from '../Images/product.svg'
import supplerImage from "../Images/supplier.svg"
import brandImage from "../Images/brand.svg"
import { Container } from "../Components";
import { toast } from "react-toastify";
function DashBoard() {
  const dispatch = useDispatch();
  const { dashboardData, loading } = useSelector((state) => state.dashBoard);
  useEffect(() => {
   
    dispatch(DashBoardHandler()).then();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Container>            
            <div className="grid grid-cols-3 gap-4">
              <Link to="/products" >
                <CardDataStats
                  title={"Products"}
                  total={dashboardData?.productCount}
                  css={'bg-blue-400 hover:bg-blue-500'}
                >
                 <img src={productImage} alt="not found" style={{maxWidth:"50%"}}/>
                </CardDataStats>
              </Link>
              <Link to="/suppliers">
              <CardDataStats
                  title={"Suppliers"}
                  total={dashboardData?.supplierCount}
                  css={'bg-orange-400 hover:bg-orange-500'}
                >
                <img src={supplerImage} alt="not found"  style={{maxWidth:"50%" }}/>

                </CardDataStats>
              </Link>
              <Link to="/brands">
              <CardDataStats
                  title={"Brands"}
                  total={dashboardData?.brandCount}
                  css={`bg-yellow-400 hover:bg-yellow-500`}
                >
                <img src={brandImage} alt="not found" style={{maxWidth:"50%"}}/>
              </CardDataStats>
              </Link>
            </div>
        </Container>
        </>
      )}
    </>
  );
}

export default DashBoard;
