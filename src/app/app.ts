import { CommonModule } from "@angular/common"
import { Component, type OnInit, signal, computed } from "@angular/core"
import { FormsModule } from "@angular/forms"

interface Asesor {
  nombre: string
  enCurso: number
  activas: number
  instaladas: number
  canceladas: number
  total: number
}

interface EquipoConDatos {
  nombre: string
  emoji: string
  asesores: Asesor[]
  tipo: "luz" | "melissa"
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class App implements OnInit {
  equipoLuz = signal<Asesor[]>([])
  equipoMelissa = signal<Asesor[]>([])

  private previousWinner = signal<string>("luz")
  isSwapping = signal<boolean>(false)

  equiposOrdenados = computed(() => {
    const totalLuz = this.getTotalEquipo(this.equipoLuz())
    const totalMelissa = this.getTotalEquipo(this.equipoMelissa())

    const equipoLuzData: EquipoConDatos = {
      nombre: "EQUIPO LUZ",
      emoji: "💥",
      asesores: this.equipoLuz(),
      tipo: "luz",
    }

    const equipoMelissaData: EquipoConDatos = {
      nombre: "EQUIPO MELISSA",
      emoji: "🐺",
      asesores: this.equipoMelissa(),
      tipo: "melissa",
    }

    let currentWinner = "luz"
    if (totalMelissa > totalLuz) {
      currentWinner = "melissa"
    } else if (totalLuz === totalMelissa) {
      currentWinner = "empate"
    }

    if (currentWinner !== this.previousWinner() && currentWinner !== "empate") {
      this.triggerSwapAnimation()
      this.previousWinner.set(currentWinner)
    }

    // El equipo ganador siempre va primero
    if (totalLuz > totalMelissa) {
      return [equipoLuzData, equipoMelissaData]
    } else if (totalMelissa > totalLuz) {
      return [equipoMelissaData, equipoLuzData]
    } else {
      // En caso de empate, mantener orden original
      return [equipoLuzData, equipoMelissaData]
    }
  })

  ngOnInit() {
    this.cargarDatos()
  }

  cargarDatos() {
    const datosGuardadosLuz = localStorage.getItem("equipoLuz")
    const datosGuardadosMelissa = localStorage.getItem("equipoMelissa")

    if (datosGuardadosLuz && datosGuardadosMelissa) {
      this.equipoLuz.set(JSON.parse(datosGuardadosLuz))
      this.equipoMelissa.set(JSON.parse(datosGuardadosMelissa))
    } else {
      this.inicializarDatos()
    }
  }

  inicializarDatos() {
    const inicialLuz: Asesor[] = []
    const inicialMelissa: Asesor[] = []

    for (let i = 1; i <= 9; i++) {
      inicialLuz.push({
        nombre: `Asesor ${i}`,
        enCurso: 0,
        activas: 0,
        instaladas: 0,
        canceladas: 0,
        total: 0,
      })

      inicialMelissa.push({
        nombre: `Asesor ${i}`,
        enCurso: 0,
        activas: 0,
        instaladas: 0,
        canceladas: 0,
        total: 0,
      })
    }

    this.equipoLuz.set(inicialLuz)
    this.equipoMelissa.set(inicialMelissa)
    this.guardarDatos()
  }

  guardarDatos() {
    localStorage.setItem("equipoLuz", JSON.stringify(this.equipoLuz()))
    localStorage.setItem("equipoMelissa", JSON.stringify(this.equipoMelissa()))
  }

  actualizarTotal(asesor: Asesor) {
    asesor.total = asesor.activas
    this.guardarDatos()
  }

  getTotalEquipo(equipo: Asesor[]): number {
    return equipo.reduce((sum, asesor) => sum + asesor.total, 0)
  }

  getRowClass(activas: number): string {
    if (activas <= 3) return "low-performer"
    if (activas <= 6) return "medium-performer"
    return "high-performer"
  }

  get equipoGanador() {
    const totalLuz = this.getTotalEquipo(this.equipoLuz())
    const totalMelissa = this.getTotalEquipo(this.equipoMelissa())

    if (totalLuz > totalMelissa) return "luz"
    if (totalMelissa > totalLuz) return "melissa"
    return "empate"
  }

  getEquipoClasses(tipo: "luz" | "melissa") {
    const isWinner = this.equipoGanador === tipo
    const isFirstPosition = this.equiposOrdenados()[0]?.tipo === tipo

    return {
      "winner-glow": isWinner,
      "team-container": true,
      "animate-swap-up": this.isSwapping() && isWinner && !isFirstPosition,
      "animate-swap-down": this.isSwapping() && !isWinner && isFirstPosition,
      "position-first": isFirstPosition,
      "position-second": !isFirstPosition,
    }
  }

  private triggerSwapAnimation() {
    this.isSwapping.set(true)
    setTimeout(() => {
      this.isSwapping.set(false)  
    }, 1000)
  }

  trackByEquipo(index: number, equipo: EquipoConDatos): string {
    return equipo.tipo
  }

  
}
