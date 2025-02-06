import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8C7753;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const FlatImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  margin-left: 10%;
  margin-top: 10%;
`;

const Navbar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
`;

const NavbarButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "none" : "rgba(255, 255, 255, 0.2)")};
  }
`;

const Flats = () => {
  const { towerId, floorId, unitId } = useParams();
  const navigate = useNavigate();

  // Generate image path for the flat
  const imagePath = `/iso/flats/a-3bhk.png`;

  return (
    <Container>
      <ImageContainer>
        <Navbar>
          <NavbarButton onClick={() => navigate("/")}>Sector 66</NavbarButton>
          <NavbarButton disabled>{`Tower ${towerId} - Floor ${floorId} - Unit ${unitId}`}</NavbarButton>
          <NavbarButton onClick={() => navigate(`/tower/${towerId}/floor/${floorId}`)}>⬅</NavbarButton>
        </Navbar>
        
        <FlatImage
          src={imagePath}
          alt={`Flat ${unitId} layout`}
        />
      </ImageContainer>
    </Container>
  );
};

export default Flats;