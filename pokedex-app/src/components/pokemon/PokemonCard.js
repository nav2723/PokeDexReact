import React, { Component } from 'react'
import styled from 'styled-components';
import Spinner from '../pokemon/spinner.gif'



const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

export default class PokemonCard extends Component {

    state ={
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        tooManyRequests: false

    }

    componentDidMount() {
        const {name, url} = this.props;
        const pokemonIndex = url.split("/")[url.split('/').length-2];
        const imageUrl = `https://github.com/pokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({name: name, imageUrl: imageUrl, pokemonIndex: pokemonIndex});
    }
    render() {


        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <div className="card">
         
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                    {this.state.imageLoading ? (
                        <img src={Spinner} style={{width: '5em', height: '5em'}} className="card-img-top rounded mx-auto d-block mt-2"/>
                    ) : null}
                    <Sprite className="card-img-top rounded mx-auto mt-2"
                    src={this.state.imageUrl}
                    onLoad={() => this.setState({imageLoading: false})}
                    onError={() => this.setState({tooManyRequests: true})}
                    style={
                        this.state.tooManyRequests ? {display: "none"} : this.state.imageLoading ? null : {display: "block"} 
                    }>
                    </Sprite>
                    {this.state.tooManyRequests ? (<h6 className="mx-auto">
                        <span className="badge badge-danger mt-2">Too many requests</span></h6>) : null}
                    <div className="card-body  mx-auto">
                        <h6 className="card-title">{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}</h6>
                    </div>
                
                </div>                
            </div>
        )
    }
}
