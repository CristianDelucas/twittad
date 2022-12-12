export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send({ userName: "John Doe" })
}
