const API_URL = 'http://localhost:3000/api/dosen'

document.addEventListener('DOMContentLoaded', loadData)

async function loadData() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()

    const tabel = document.getElementById('tabelBody')
    tabel.innerHTML = ''

    data.forEach(dosen => {
      tabel.innerHTML += `
        <tr>
          <td>${dosen.id}</td>
          <td>${dosen.nama}</td>
          <td>${dosen.nidn}</td>
          <td>${dosen.prodi}</td>
          <td>${dosen.fakultas}</td>
          <td>
                <button class="btn btn-sm btn-warning" onClick="editData(${dosen.id}, '${dosen.nama}', '${dosen.nidn}', '${dosen.prodi}', '${dosen.fakultas}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusData(${dosen.id})">Hapus</button>
            </td>
        </tr>
      `
    })

  } catch (err) {
    console.error(err)
  }
}

// SUBMIT
document.getElementById('formDosen').addEventListener('submit', async function(e) {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nama = document.getElementById('nama').value
  const nidn = document.getElementById('nidn').value
  const prodi = document.getElementById('prodi').value
  const fakultas = document.getElementById('fakultas').value

  let url = API_URL
  let method = 'POST'

  if (id) {
    url = `${API_URL}/${id}`
    method = 'PUT'
  }

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama, nidn, prodi, fakultas })
  })

  this.reset()
  document.getElementById('id').value = ''
  loadData()
})

// EDIT
window.editData = (id, nama, nidn, prodi, fakultas) => {
  document.getElementById('id').value = id
  document.getElementById('nama').value = nama
  document.getElementById('nidn').value = nidn
  document.getElementById('prodi').value = prodi
  document.getElementById('fakultas').value = fakultas
}

// DELETE
window.hapusData = async (id) => {
  if (confirm('Yakin hapus?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    loadData()
  }
}