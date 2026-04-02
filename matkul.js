const API_URL = 'http://localhost:3000/api/matkul'

document.addEventListener('DOMContentLoaded', loadData)

async function loadData() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()

    const tabel = document.getElementById('tabelBody')
    tabel.innerHTML = ''

    data.forEach(matkul => {
      tabel.innerHTML += `
        <tr>
          <td>${matkul.id}</td>
          <td>${matkul.nama}</td>
          <td>${matkul.kode}</td>
          <td>${matkul.sks}</td>
          <td>${matkul.jadwal}</td>
          <td>${matkul.jam}</td>
          <td>
                <button class="btn btn-sm btn-warning" onClick="editData(${matkul.id}, '${matkul.nama}', '${matkul.kode}', '${matkul.sks}', '${matkul.jadwal}', '${matkul.jam}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusData(${matkul.id})">Hapus</button>
            </td>
        </tr>
      `
    })

  } catch (err) {
    console.error(err)
  }
}

// SUBMIT
document.getElementById('formMatkul').addEventListener('submit', async function(e) {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nama = document.getElementById('nama').value
  const kode = document.getElementById('kode').value
  const sks = document.getElementById('sks').value
  const jadwal = document.getElementById('jadwal').value
  const jam = document.getElementById('jam').value

  let url = API_URL
  let method = 'POST'

  if (id) {
    url = `${API_URL}/${id}`
    method = 'PUT'
  }

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama, kode, sks, jadwal, jam })
  })

  this.reset()
  document.getElementById('id').value = ''
  loadData()
})

// EDIT
window.editData = (id, nama, kode, sks, jadwal, jam) => {
  document.getElementById('id').value = id
  document.getElementById('nama').value = nama
  document.getElementById('kode').value = kode
  document.getElementById('sks').value = sks
  document.getElementById('jadwal').value = jadwal
  document.getElementById('jam').value = jam
}

// DELETE
window.hapusData = async (id) => {
  if (confirm('Yakin hapus?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    loadData()
  }
}