import Modal from "../../../../components/modal";
import {useMemo} from "react";
import {StatsCategories} from "../../../../models";
import {PolarArea} from "react-chartjs-2";
import {generateColorRGB} from "../../../../helpers/function.ts";
import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale} from "chart.js";


interface props {
    stats: StatsCategories[]
    closeModal: () => void
}

ChartJS.register(
    Legend,
    RadialLinearScale,
    ArcElement
)

const CreateProductModal = ({stats, closeModal}: props) => {
    const chartData = useMemo(() => {
        return {
            labels: stats.map(stat => stat.category),
            datasets: [
                {
                    data: stats.map(stat => stat.numberOfProducts),
                    backgroundColor: stats.map(_ => generateColorRGB())
                }
            ]
        }
    }, [stats]);

    return (
        <Modal.Container closeModal={closeModal}>
            <Modal.Title>
                Grafico dei prodotti
            </Modal.Title>
            <Modal.Content>
                <PolarArea data={chartData}/>
            </Modal.Content>
        </Modal.Container>
    );
};

export default CreateProductModal;
