const Card =({title, content})=>{
    return <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{content}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
}
export default Card;