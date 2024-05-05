import React, { useState, useEffect } from 'react';
import { fetchRoverPhotosBySol } from '../../nasaAPI/MARSRoverapi';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const FetchMarsRoverPhotos = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState();
  const [camera, setCamera] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [isTinyScreen, setIsTinyScreen] = useState(window.innerWidth <= 540);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleFetchPhotos = async () => {
    try {
      setLoading(true);
      const data = await fetchRoverPhotosBySol(rover, sol, camera || null, pages); // Pass the selected number of pages
      console.log(data.photos)
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTinyScreen(window.innerWidth <= 540);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div class="grid text-center grid--3-cols">
        <div class="g-col-6 g-col-md-4">
          <Link to="/marssol" role="button" className={`btn btn-danger ${isTinyScreen ? 'btn-sm' : ''}`}>
            Fetch Mars Sol
          </Link>
        </div>
        <div class="g-col-6 g-col-md-4">
          <Link to="/marsearthdate" role="button" className={`btn btn-danger ${isTinyScreen ? 'btn-sm' : ''}`}>
            Images Mars by Earth Date
          </Link>
        </div>
        <div class="g-col-6 g-col-md-4">
          <Link to="/marsmanifestdata" role="button" className={`btn btn-danger ${isTinyScreen ? 'btn-sm' : ''}`}>
            Fetch Mars Manifest Data
          </Link>
        </div>
      </div>
      <h2 className='text-white'>Fetch Photos by Sol</h2>
      <label className='text-white text-label' style={{ marginRight: "24px" }}>
        Rover:
        <select value={rover} onChange={(e) => setRover(e.target.value)} class="form-select">
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
      </label>
      <label className='text-white text-label' style={{ marginRight: "24px" }}>
        Sol:
        <input type="number" value={sol} onChange={(e) => setSol(e.target.value)} class="form-control" placeholder='sol' />
      </label>
      <label className='text-white text-label' style={{ marginRight: "24px" }}>
        Camera:
        <select value={camera} onChange={(e) => setCamera(e.target.value)} class="form-select">
          <option value="fhaz">FHAZ</option>
          <option value="rhaz">RHAZ</option>
          <option value="mast">MAST</option>
          <option value="chemcam">CHEMCAM</option>
          <option value="mahli">MAHLI</option>
          <option value="mardi">MARDI</option>
          <option value="navcam">NAVCAM</option>
          <option value="pancam">PANCAM</option>
          <option value="minites">MINITES</option>
        </select>
      </label>
      <label className='text-white text-label' style={{ marginRight: "24px" }}>
        Pages:
        <input type="number" value={pages} min="1" onChange={(e) => setPages(e.target.value)} class="form-control" />
      </label>
      <button onClick={handleFetchPhotos} class="btn btn-blue">
        {loading ? 'Wait...' : 'Fetch Photos'}
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: "20px" }}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt="Mars Rover"
            style={{ width: '300px', height: '300px', margin: '5px' }}
            onClick={() => {
              setModalData({});
              setModalData(photo)
              setShowModal(true)
            }}
          />
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <img src={modalData.img_src} className='model-width-img' />
          <p><strong>ID :</strong> {modalData.id}</p>
          <p><strong>Sol :</strong> {modalData.sol}</p>
          <p><strong>Earth Date :</strong> {modalData.earth_date}</p>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default FetchMarsRoverPhotos