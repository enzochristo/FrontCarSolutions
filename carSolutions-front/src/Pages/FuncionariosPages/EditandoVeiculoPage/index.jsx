// src/Pages/FuncionariosPages/CadastroVeiculoPage/index.jsx
import { useState, useEffect } from 'react';
import './index.css';
import { updateCar, getCarById } from '../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import iconEdit from '../../../assets/editarlogo.png';

const CATEGORY_CHOICES = ['SUV', 'SEDAN', 'CAMINHONETES', 'OUTROS'];
const AVAILABILITY_CHOICES = ['Aluguel', 'Venda', 'Aluguel e Venda'];
const CAMBIO_CHOICES = ['Automático', 'Manual'];
const COMBUSTIVEL_CHOICES = ['Gasolina', 'Diesel', 'Elétrico', 'Flex'];

const EditandoVeiculo = () => {
  const id  = useParams();
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
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const car = await getCarById(id); // Chama a API para obter os dados do carro
        setFormData(car); // Preenche o formulário com os dados do carro
      } catch (error) {
        console.error('Erro ao carregar os dados do carro:', error);
      }
    };
    fetchCarData();
  }, [id]);

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
      await updateCar(id, carData);
      alert("Carro atualizado com sucesso!");
      navigate('/funcionario/ProdutosCadastrados'); // Redireciona para a página de produtos após salvar
    } catch (error) {
      console.error("Erro ao atualizar carro:", error);
      alert("Erro ao atualizar carro.");
    }
  };

  const handleCancel = () => {
    navigate('/funcionario/ProdutosCadastrados');
  };

  return (
    <div className="body-container">
      <div className="background-image-editando"></div>
      <div className="overlay"></div>
      <div className="content-cadastroveiculo">
        <div className="cadastro-veiculo">
        <div className="titulo-container">
          <img src={iconEdit} alt="Ícone de Edição" className="titulo-icone2" />
          <h2 className="titulo-texto2">Editar Veículo</h2>
        </div>
          <form onSubmit={handleSubmit} className="cadastro-form">
            <div className="form-group">
              <div>
                <label>Modelo do Carro:</label>
                <input
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
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  maxLength="50"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label>Preço de Venda:</label>
                <input
                  type="number"
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
                  name="preco_diaria"
                  value={formData.preco_diaria}
                  onChange={handleChange}
                  max="99999999.99"
                  step="0.01"
                />
              </div>
            </div>

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
                <label>Categoria:</label>
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

            <div className="form-group">
              <div>
                <label>Câmbio:</label>
                <select
                  name="cambio"
                  value={formData.cambio}
                  onChange={handleChange}
                  required
                >
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
                  {COMBUSTIVEL_CHOICES.map((comb) => (
                    <option key={comb} value={comb}>{comb}</option>
                  ))}
                </select>
              </div>


              
            </div>

            <div className="form-group">
              <div>
                <label>Cor:</label>
                <input
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
                  value={formData.placa}
                  onChange={handleChange}
                  maxLength="7"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label>Alterar Imagem:</label>
                <input
                  type="file"
                  name="imagem"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label>Ano:</label>
                <input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button-group-edit">
              <button type="button" className="cancel-button-edit" onClick={handleCancel}>Cancelar</button>
              <button type="submit" className="submit-button-edit">Atualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditandoVeiculo;
