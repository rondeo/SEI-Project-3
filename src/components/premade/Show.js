import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Show extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      premade: null,
      product: []
    }
    this.setPrice = this.setPrice.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/premade/${this.props.match.params.id}`)
      .then(res => this.setState({ premade: res.data}))
      .then(this.setPrice)
  }

  setPrice(){
    if(this.state.premade.total === 3){
      this.setState({...this.state.premade,  price: 10})
    } else if(this.state.premade.total === 6){
      this.setState({price: 15})
    } else {
      this.setState({price: 25})
    }
  }

  render() {

    if(!this.state.premade) return null
    const { image, category, description } = this.state.premade
    const { price } = this.state

    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">{category} Premade Box</h1>
          <hr />

          <div className="columns is-multiline">
            <div className="column is-half-desktop is-full-tablet">
              <figure className="image is-square">
                <img src={image} alt={name} />
              </figure>
            </div>

            <div className="column is-half-desktop is-full-tablet">
              <p className="largerText">{description}</p>
              <hr />
              <p>£{price}</p>
              {Auth.isAuthenticated() && <Link to="/ordered" className="button is-dark">Buy Now!</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="button is-dark">Login</Link>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}


export default Show
