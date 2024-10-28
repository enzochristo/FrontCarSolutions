// src/components/TabelaCarros/index.jsx
import PropTypes from 'prop-types'; // Importa PropTypes para validação das props
import { useNavigate } from 'react-router-dom';
import './index.css';
import trash from '../../assets/trash.png';
import plus from '../../assets/plus.png';
import edit from '../../assets/edit.png';

const TabelaCarros = ({ cars, onView, onDelete }) => {
  const navigate = useNavigate();

  return (
    <table className="car-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Extras</th>
          <th>Editar</th>
          <th>Apagar</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.modelo}</td>
            <td>{car.tipo_de_produto}</td>
            <td>
              <button onClick={() => onView(car)}>
                <img className='icone' src={plus} alt="Ver detalhes" />
              </button>
            </td>
            <td>
              <button onClick={() => navigate(`/funcionarios/editar/${car.id}`)}>
                <img className='icone' src={edit} alt="Editar" />
              </button>
            </td>
            <td>
              <button onClick={() => onDelete(car.id)}>
                <img className='icone' src={trash} alt="Lixo" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Define os tipos de props esperados pelo componente
TabelaCarros.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    modelo: PropTypes.string.isRequired,
    tipo_de_produto: PropTypes.string.isRequired,
  })).isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TabelaCarros;
