import React from "react";

import Filtros from "./components/Filtros.js";
import Produtos from "./components/Produtos.js";
import Carrinho from "./components/Carrinho.js";
import styled from "styled-components";
import ImagemFundo from "./Img/Fundo.jpg"
import Tenis1 from  "./Img/Tenis1.jpg"
import Tenis2 from "./Img/Tenis2.jpg"
import Tenis3 from "./Img/Tenis3.jpg"
import Tenis4 from "./Img/Tenis4.jpg"
import Tenis5 from "./Img/Tenis5.jpg"
import Tenis6 from "./Img/Tenis6.jpg"
import Tenis7 from "./Img/Tenis7.jpg"
import Tenis8 from "./Img/Tenis8.jpg"





const Container = styled.div`
  background-image: url(${ImagemFundo});
  background-position: 50% 0;
  display: flex;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  font-size: 18px;
`;
const Select = styled.select`
  height: 70%;
  margin-top: 2vh;
  margin-right: 2vh;
  font-size: 18px;

`;
const ContainerProdutos = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 2fr);
  grid-column-gap: 1vw;
  grid-row-gap: 1vh;
  justify-items: center;
  align-items: center;
  background-color: #000000c5;
  color: #fff;

`;
const Produto = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  &:hover {
      transition: ease-in-out, .600ms;
      zoom: 1.1;
      cursor: pointer;
  }
`;



const Botao = styled.button`
    width: 100%;
    height: 40px;
    line-height: 40px;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  background-color: #8e44ad;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;

  }
`;

const CarrinhoCompras = styled.div`
  margin: 1vw;
  padding-left: 2vw;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 97vh;
  width: 25vw;
  background-color: #8e44ad;

`;

const produtos = [
  {
    id: 1,
    name: "Tenis1",
    value: 100.0,
    imageUrl: Tenis1,
  },

  {
    id: 2,
    name: "Tenis2",
    value: 95.0,
    imageUrl: Tenis2,
  },

  {
    id: 3,
    name: "Tenis3",
    value: 45.0,
    imageUrl: Tenis3,
  },

  {
    id: 4,
    name: "Tenis4",
    value: 250.0,
    imageUrl: Tenis4,
  },

  {
    id: 5,
    name: "Tenis5",
    value: 300.0,
    imageUrl: Tenis5,
  },

  {
    id: 6,
    name: "Tenis6",
    value: 50.0,
    imageUrl: Tenis6,
  },

  {
    id: 7,
    name: "Tenis7",
    value: 20.0,
    imageUrl: Tenis7,
  },

  {
    id: 8,
    name: "Tenis8",
    value: 68.0,
    imageUrl: Tenis8,
  },
];

class App extends React.Component {
  state = {
    produtos: produtos,
    ordenacao: "crescente",
    valorMaximo: Infinity,
    valorMinimo: 0,
    buscarProduto: "",
    carrinho: [],
    adicionado: false,
  };

  alteraOrdenacao = (event) => {
    this.setState({ ordenacao: event.target.value });
  };

  onChangeValorMinimo = (event) => {
    this.setState({ valorMinimo: Number(event.target.value) });
  };

  onChangeValorMaximo = (event) => {
    this.setState({ valorMaximo: Number(event.target.value) });
  };

  onChangeBusca = (event) => {
    this.setState({ buscarProduto: event.target.value });
  };

  filtraProdutos = () => {
    let produtosFiltrados = this.state.produtos;
    if (this.state.valorMinimo) {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.value >= this.state.valorMinimo;
      });
    }
    if (this.state.valorMaximo) {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.value <= this.state.valorMaximo;
      });
    }
    if (this.state.buscarProduto !== "") {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.name.includes(this.state.buscarProduto);
      });
    }
    return produtosFiltrados;
  };

  adicionarProduto = (id) => {
    let novoCarrinho = this.state.carrinho;
    // produtoExiste recebe o index de cada produto do carrinho
    const produtoExiste = novoCarrinho.findIndex(
      (produto) => produto.id === id
    );

    // metodo findIndex retorna -1 caso não encontre produto no array novoCarrinho
    if (produtoExiste === -1) {
      const produto = this.state.produtos.find((item) => item.id === id);

      const produtoAdicionado = {
        id: produto.id,
        nome: produto.name,
        valor: produto.value,
        quantidade: 1,
      };
      novoCarrinho.push(produtoAdicionado);
    } else {
      const qtde = novoCarrinho[produtoExiste].quantidade;
      novoCarrinho[produtoExiste] = {
        ...novoCarrinho[produtoExiste],
        quantidade: qtde + 1,
      };
    }

    this.setState({ carrinho: novoCarrinho });
  };

  excluirProduto = (id) => {
    const excluirDoCarrinho = this.state.carrinho.filter((produto) => {
      return produto.id !== id;
    });

    this.setState({ carrinho: excluirDoCarrinho });
  };

  render() {
    const listaOrdenada = this.filtraProdutos().sort((a, b) => {
      if (this.state.ordenacao === "crescente") {
        return a.value - b.value;
      } else if (this.state.ordenacao === "decrescente") {
        return b.value - a.value;
      }
    });

    const listaProdutos = listaOrdenada.map((produto) => {
      return (
        <Produto>
          <Produtos
            key={produto.id}
            imagemProduto={produto.imageUrl}
            nomeProduto={produto.name}
            valorProduto={produto.value}
          />
          <Botao
            onClick={() => {
              this.adicionarProduto(produto.id);
            }}
          >
            Adicionar ao carrinho
          </Botao>
        </Produto>
      );
    });

    const listaCarrinho = this.state.carrinho.map((produtoNoCarrinho) => {
      return (
        <Carrinho
          nomeProduto={produtoNoCarrinho.nome}
          valorProduto={produtoNoCarrinho.valor}
          quantidade={produtoNoCarrinho.quantidade}
          excluir={() => this.excluirProduto(produtoNoCarrinho.id)}
        />
      );
    });

    return (
      <Container>
        <Filtros
          filtrarMin={this.onChangeValorMinimo}
          filtrarMax={this.onChangeValorMaximo}
          buscarProduto={this.onChangeBusca}
        />
        <div>
          <Header>
            <p>Quantidade de Produtos : {listaProdutos.length}</p>
            <Select
              value={this.state.ordenacao}
              onChange={this.alteraOrdenacao}
            >
              <option value="crescente"> Preço: Crescente </option>
              <option value="decrescente"> Preço: Decrescente </option>
            </Select>
          </Header>
          <ContainerProdutos> {listaProdutos} </ContainerProdutos>
        </div>
        <CarrinhoCompras>
          <h2>Carrinho</h2>
          {listaCarrinho}
          <p>
            Total:{" "}
            {this.state.carrinho.reduce(
              (acumulador, objeto) =>
                acumulador + objeto.quantidade * objeto.valor,
              0
            )}
          </p>
        </CarrinhoCompras>
      </Container>
    );
  }
}

export default App;
