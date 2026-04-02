const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'rafael',
    password : ''
})

db.connect((error) => {
    if (error) {
        console.error('Gagal koenksi:', error)
        return
    }
    console.log('Terhubung ke database MySQL')
})

app.get('/api/mahasiswa', (req,res) => {
    const sql = 'SELECT * FROM mahasiswa'
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'Internal server error' })
            return
        }
        res.json(results)
    })
})

app.post('/api/mahasiswa', (req,res)=>{
    const { nama, nim, fakultas} = req.body
    const sql = 'INSERT INTO mahasiswa (nama, nim, fakultas) VALUES(?,?,?)'

    db.query(sql, [nama,nim,fakultas],(error,results)=>{
        if(error) return res.status(500).json({error: error.message})
        res.json({message: 'Data berhasil ditambahkan', id:results.insertId})
    })})


app.put('/api/mahasiswa/:id', (req,res) => {
    const { id } = req.params  
    const { nama, nim, fakultas } = req.body
    const sql = 'UPDATE mahasiswa SET nama = ?, nim = ?, fakultas = ? WHERE id = ?'
    db.query(sql, [nama, nim, fakultas, id], (error, results) => {
        if (error) return res.status(500).json({ error: 'Internal server error' })
        res.json({ message: 'Data mahasiswa berhasil ditambahkan', id: results.insertId })
    })
})

app.delete('/api/mahasiswa/:id', (req,res) => {
    const { id } = req.params
    const sql = 'DELETE FROM mahasiswa WHERE id = ?'
    db.query(sql, [id], (error, results) => {
        if (error) return res.status(500).json({ error: 'Internal server error' })
        res.json({ message: 'Data mahasiswa berhasil dihapus' })
    })
})

app.get('/api/dosen', (req, res) => {
  db.query('SELECT * FROM dosen', (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post('/api/dosen', (req, res) => {
  const { nama, nidn, prodi, fakultas } = req.body
  db.query(
    'INSERT INTO dosen (nama,nidn,prodi,fakultas) VALUES (?,?,?,?)',
    [nama, nidn, prodi, fakultas],
    (err) => {
      if (err) throw err
      res.json({ message: 'Data dosen ditambahkan' })
    }
  )
})

app.delete('/api/dosen/:id', (req, res) => {
  db.query('DELETE FROM dosen WHERE id=?', [req.params.id], (err) => {
    if (err) throw err
    res.json({ message: 'Data dihapus' })
  })
})

app.get('/api/dosen', (req, res) => {
  db.query('SELECT * FROM dosen', (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post('/api/dosen', (req, res) => {
  const { nama, nidn, prodi, fakultas } = req.body
  db.query(
    'INSERT INTO dosen (nama,nidn,prodi,fakultas) VALUES (?,?,?,?)',
    [nama, nidn, prodi, fakultas],
    (err) => {
      if (err) throw err
      res.json({ message: 'Data dosen ditambahkan' })
    }
  )
})

//================MATKUL================

app.get('/api/matkul', (req, res) => {
  db.query('SELECT * FROM matkul', (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post('/api/matkul', (req, res) => {
  const { nama, kode, sks, jadwal, jam } = req.body
  db.query(
    'INSERT INTO matkul (nama,kode,sks,jadwal,jam) VALUES (?,?,?,?,?)',
    [nama, kode, sks, jadwal, jam],
    (err) => {
      if (err) throw err
      res.json({ message: 'Data matkul ditambahkan' })
    }
  )
})

app.delete('/api/matkul/:id', (req, res) => {
  db.query('DELETE FROM matkul WHERE id=?', [req.params.id], (err) => {
    if (err) throw err
    res.json({ message: 'Data dihapus' })
  })
})

app.get('/api/matkul', (req, res) => {
  db.query('SELECT * FROM matkul', (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post('/api/matkul', (req, res) => {
  const { nama, kode, sks, jadwal, jam } = req.body
  db.query(
    'INSERT INTO matkul (nama,kode,sks,jadwal,jam) VALUES (?,?,?,?,?)',
    [nama, kode, sks, jadwal, jam],
    (err) => {
      if (err) throw err
      res.json({ message: 'Data matkul ditambahkan' })
    }
  )
})

app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`)
})