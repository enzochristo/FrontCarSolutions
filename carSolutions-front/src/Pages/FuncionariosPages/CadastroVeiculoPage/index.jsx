// src/Pages/FuncionariosPages/CadastroVeiculoPage/index.jsx

import { useState } from 'react';
import './index.css';
import { createCar } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import EditarLogo from '../../../assets/editarlogo.png'

const CATEGORY_CHOICES = ['SUV', 'SEDAN', 'CAMINHONETES', 'OUTROS'];
const AVAILABILITY_CHOICES = ['Aluguel', 'Venda', 'Aluguel e Venda'];
const CAMBIO_CHOICES = ['Automático', 'Manual'];
const COMBUSTIVEL_CHOICES = ['Gasolina', 'Diesel', 'Elétrico', 'Flex'];

const CadastroVeiculoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    categoria: '',
    preco_venda: '',
    preco_diaria: '',
    tipo_de_produto: '',
    imagem: '',
    cambio: '',
    combustivel: '',
    cor: '',
    placa: '',
    is_disponivel: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagem: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      carData.append(key, value);
    });
    try {
      await createCar(carData);
      alert("Veículo cadastrado com sucesso!");
      setFormData({
        marca: '',
        modelo: '',
        ano: '',
        categoria: '',
        preco_venda: '',
        preco_diaria: '',
        tipo_de_produto: '',
        imagem: '',
        cambio: '',
        combustivel: '',
        cor: '',
        placa: '',
        is_disponivel: true,
      });
      navigate('/funcionario/ProdutosCadastrados');
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      alert("Erro ao cadastrar veículo.");
    }
  };

  const handleCancel = () => {
    navigate('/funcionario/ProdutosCadastrados');
  };

  return (
    <div className='body-container'>
      <div className='background-image-editando'></div> {/* Adiciona a imagem de fundo */}
      <div className="overlay"></div>
      <div className='content-cadastroveiculo'>
        <div className="cadastro-veiculo">
          {/* Contêiner do título com ícone */}
          <div className="titulo-container">
            <img src={EditarLogo} alt="Ícone Cadastrar Veículo" className="titulo-icone2" />
            <h2 className="titulo-texto2">Cadastrar Veículo</h2>
          </div>

          <form onSubmit={handleSubmit} className="cadastro-form">
            <div className="form-group">
              <div>
                <label>Modelo do Carro:</label>
                <input
                className='input-cadastro'
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  maxLength="50"
                  required
                />
              </div>

              <div>
                <label>Marca:</label>
                <input
                  type="text"
                  className='input-cadastro'
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  maxLength="50"
                  required
                />
              </div>
            </div>

            {/* outro grupo */}
            <div className="form-group">
              <div>
                <label>Preço de Venda:</label>
                <input
                  type="number"
                  className='input-cadastro'
                  name="preco_venda"
                  value={formData.preco_venda}
                  onChange={handleChange}
                  max="99999999.99"
                  step="0.01"
                />
              </div>

              <div>
                <label>Preço da Diária:</label>
                <input
                  type="number"
                  className='input-cadastro'
                  name="preco_diaria"
                  value={formData.preco_diaria}
                  onChange={handleChange}
                  max="99999999.99"
                  step="0.01"
                />
              </div>
            </div>

            {/* outro grupo */}
            <div className="form-group">
              <div>
                <label>Tipo do Produto:</label>
                <select
                  name="tipo_de_produto"
                  value={formData.tipo_de_produto}
                  onChange={handleChange}
                  required
                >
                  {AVAILABILITY_CHOICES.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className='label-baixo'>Categoria:</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {CATEGORY_CHOICES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* outro grupo */}
            <div className="form-group">
              <div>
                <label>Câmbio:</label>
                <select
                  name="cambio"
                  value={formData.cambio}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {CAMBIO_CHOICES.map((cambio) => (
                    <option key={cambio} value={cambio}>{cambio}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Combustível:</label>
                <select
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {COMBUSTIVEL_CHOICES.map((comb) => (
                    <option key={comb} value={comb}>{comb}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* outro grupo */}
            <div className="form-group">
              <div>
                <label>Cor:</label>
                <input
                className='input-cadastro'
                  type="text"
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  maxLength="20"
                  required
                />
              </div>

              <div>
                <label>Placa:</label>
                <input
                  type="text"
                  name="placa"
                  className='input-cadastro'
                  value={formData.placa}
                  onChange={handleChange}
                  maxLength="7"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <div>
                <label>Link da Imagem:</label>
                <input
                  type="file"
                  className='input-cadastro'
                  name="imagem"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div>
                <label className='label-ano'>Ano:</label>
                <input
                  type="number"
                  className='input-cadastro'
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="cancel-button" onClick={handleCancel} >Cancelar</button>
              <button type="submit" className="submit-button">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroVeiculoPage;
