import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())

const SHEET_URL =
  'https://opensheet.elk.sh/1ZXVwmOGuxn4VvgWxlPxNJ2nwMa6KMZ6JizvJiY4HL9w/Sheet1'
app.get('/producto', async (req, res) => {
  const { codigo } = req.query
  if (!codigo) {
    return res.status(400).json({ error: 'Código requerido' })
  }

  try {
    const { data } = await axios.get(SHEET_URL)

    const producto = data.find(p => p.codigo === codigo)

    if (!producto) {
      return res.status(404).json({ error: 'No encontrado' })
    }

    res.json({
      proveedor: producto.proveedor,
      precioProveedor: producto.precio_proveedor,
      precioVenta: producto.precio_venta,
    })
  } catch (err) {
    res.status(500).json({ error: 'Error leyendo datos' })
  }
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Backend listo en puerto', PORT);
});