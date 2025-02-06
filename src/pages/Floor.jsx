import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { floors } from '../svgs/floors'; // Import floors SVG data

// Helper function to map tower IDs
const mapTowerId = (id) => {
  // If id is already in correct format (T1, T2, etc.), return it
  if (id.startsWith('T')) {
    return id;
  }
  
  // Otherwise, convert number to correct format
  return `T${id}`;
};

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

const FloorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

const SVGContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
`;

const SVGPath = styled.path`
  pointer-events: all;
  cursor: pointer;
  fill: green;
  fill-opacity: 0.4;
  stroke: white;
  stroke-width: 2;
  transition: fill-opacity 0.3s ease;

  &:hover {
    fill-opacity: 0;
  }
`;

const Floor = () => {
  const { towerId, floorId } = useParams();
  const navigate = useNavigate();

  // Handle SVG path click
  const handleUnitClick = (unitId) => {
    // Navigate to the Flats view with tower, floor, and unit information
    navigate(`/tower/${towerId}/floor/${floorId}/unit/${unitId}`);
  };

  // Map the tower ID to correct format
  const mappedTowerId = mapTowerId(towerId);
  console.log("Mapped Tower ID:", mappedTowerId);

  // Get the SVG data for this tower's typical floor
  const floorSvg = floors[mappedTowerId]?.typical;
  console.log("Floor SVG:", floorSvg);

  // Generate image path
  const imagePath = `/iso/floors/${mappedTowerId}/typical.png`;

  return (
    <Container>
      <ImageContainer>
        <Navbar>
          <NavbarButton onClick={() => navigate("/")}>Sector 66</NavbarButton>
          <NavbarButton disabled>{`Tower ${mappedTowerId} - Floor ${floorId}`}</NavbarButton>
          <NavbarButton onClick={() => navigate(`/tower/${towerId}`)}>⬅</NavbarButton>
        </Navbar>
        
        <SVGContainer 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="none"
        >
          <image
            xlinkHref={imagePath}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ objectFit: 'fill' }}
          />

          {/* Render SVG paths with click handlers */}
          {floorSvg && React.Children.map(floorSvg.props.children, (path) => (
            path && path.type === 'path' && (
              <SVGPath
                key={path.props.id}
                d={path.props.d}
                id={path.props.id}
                data-unit={path.props.id}
                onClick={() => handleUnitClick(path.props.id)}
              />
            )
          ))}
        </SVGContainer>
      </ImageContainer>
    </Container>
  );
};

export default Floor;