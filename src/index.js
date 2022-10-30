import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'


const root = createRoot(document.getElementById("app"))
root.render(<BrowserRouter><App /></BrowserRouter>)