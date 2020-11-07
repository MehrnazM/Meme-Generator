import React from "react"
import _ from "lodash"

class MemeGenerator extends React.Component{

    constructor(){
        super()
        this.state = {
            topText : "",
            bottomText : "",
            randomImg : "",
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(imgs => {
            const {memes} = imgs.data
            this.setState({
                allMemeImgs : memes
            })
        })
    }

    handleChange(event){
        
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleClick(event){
        
        event.preventDefault()
        const allMemes = this.state.allMemeImgs
        const meme = _.sample(allMemes)
        console.log(meme.url)
        this.setState({
            randomImg : meme.url
        })
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleClick}>
                        <input type="text" name="topText" value={this.state.topText} placeholder="Top Text" onChange={this.handleChange}/>
                        <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Bottom Text" onChange={this.handleChange}/>
                        <button>Gen</button>
                </form>
                
                    {(this.state.randomImg) !== "" ?  
                        <div className="meme">
                            <img src={this.state.randomImg} alt=""/> 
                            <h2 className="top">{this.state.topText}</h2>
                            <h2 className="bottom">{this.state.bottomText}</h2>
                        </div>
                    : null}
            </div>
        )
    }
}

export default MemeGenerator