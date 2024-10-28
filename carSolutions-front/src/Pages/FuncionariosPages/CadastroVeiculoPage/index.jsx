import { useState, useEffect } from 'react';
import { createCar } from '../../../services/api';

const CadastroVeiculoPage = ({ car, onClose }) => {
  const [carData, setCarData] = useState({
    modelo: '',
    categoria: '',
    preco_venda: '',
    preco_diaria: '',
    tipo_de_produto: '',
    marca: '',
    cambio: '',
    combustivel: '',
    cor: '',
    placa: '',
    imagem: ''
  });

  useEffect(() => {
    if (car) setCarData(car);
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCar(carData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <h3>{car ? "Editar Carro" : "Adicionar Carro"}</h3>
      <input type="text" name="modelo" value={carData.modelo} onChange={handleChange} placeholder="Modelo do Carro" required />
      <input type="text" name="categoria"   value={carData.categoria}   onChange={handleChange}   placeholder="Categoria"   required />
      <input type="number" name="preco_venda" value={carData.preco_venda} onChange={handleChange} placeholder="Preço de Venda" required />
      <input type="number" name="preco_diaria" value={carData.preco_diaria} onChange={handleChange} placeholder="Preço da diaria" required />
      <input type="text" name="tipo_de_produto" value={carData.tipo_de_produto} onChange={handleChange} placeholder="Tipo de Produto" required />
      <input type="text" name="marca" value={carData.marca} onChange={handleChange} placeholder="Marca" required />
      <input type="text" name="cambio" value={carData.cambio} onChange={handleChange} placeholder="Câmbio" required />
      <input type="text" name="combustivel" value={carData.combustivel} onChange={handleChange} placeholder="Combustível" required />
      <input type="text" name="cor" value={carData.cor} onChange={handleChange} placeholder="Cor" required />
      <input type="text" name="placa" value={carData.placa} onChange={handleChange} placeholder="Placa" required />
      <input type="file" name="imagem" value={carData.imagem} onChange={handleChange} placeholder="Link da Imagem" required />
      <button type="submit">{car ? "Salvar" : "Cadastrar"}</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default CadastroVeiculoPage;
