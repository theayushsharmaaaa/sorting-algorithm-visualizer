document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const generateArrayButton = document.getElementById('generateArray');
    const startSortButton = document.getElementById('startSort');
    const pauseSortButton = document.getElementById('pauseSort');
    const resumeSortButton = document.getElementById('resumeSort');
    const algorithmSelect = document.getElementById('algorithm');
    const arraySizeSelect = document.getElementById('arraySize');
    const speedSelect = document.getElementById('speed');
    const timeComplexityText = document.getElementById('timeComplexity');
    const spaceComplexityText = document.getElementById('spaceComplexity');
    let array = [];
    let sorting = false;
    let paused = false;
    let speed = 100;

    function generateArray(size = 50) {
        array = [];
        arrayContainer.innerHTML = '';
        for (let i = 0; i < size; i++) {
            const value = Math.floor(Math.random() * 100) + 1;
            array.push(value);
            const bar = document.createElement('div');
            bar.classList.add('array-bar');
            bar.style.height = `${value * 3}px`;
            bar.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            arrayContainer.appendChild(bar);
        }
    }

    async function bubbleSort() {
        timeComplexityText.textContent = 'Time Complexity: O(n^2)';
        spaceComplexityText.textContent = 'Space Complexity: O(1)';
        const bars = document.getElementsByClassName('array-bar');
        sorting = true;
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (paused) {
                    await waitWhilePaused();
                }
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    bars[j].style.height = `${array[j] * 3}px`;
                    bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                    await new Promise(resolve => setTimeout(resolve, speed));
                }
            }
        }
        colorSortedBars(bars);
        sorting = false;
    }

    async function insertionSort() {
        timeComplexityText.textContent = 'Time Complexity: O(n^2)';
        spaceComplexityText.textContent = 'Space Complexity: O(1)';
        const bars = document.getElementsByClassName('array-bar');
        sorting = true;
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                if (paused) {
                    await waitWhilePaused();
                }
                array[j + 1] = array[j];
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                j = j - 1;
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            array[j + 1] = key;
            bars[j + 1].style.height = `${key * 3}px`;
        }
        colorSortedBars(bars);
        sorting = false;
    }

    async function selectionSort() {
        timeComplexityText.textContent = 'Time Complexity: O(n^2)';
        spaceComplexityText.textContent = 'Space Complexity: O(1)';
        const bars = document.getElementsByClassName('array-bar');
        sorting = true;
        for (let i = 0; i < array.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < array.length; j++) {
                if (paused) {
                    await waitWhilePaused();
                }
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        colorSortedBars(bars);
        sorting = false;
    }

    async function quickSort(low = 0, high = array.length - 1) {
        timeComplexityText.textContent = 'Time Complexity: O(n log n)';
        spaceComplexityText.textContent = 'Space Complexity: O(log n)';
        if (low < high) {
            const pi = await partition(low, high);
            await Promise.all([
                quickSort(low, pi - 1),
                quickSort(pi + 1, high)
            ]);
        }
        if (low === 0 && high === array.length - 1) {
            const bars = document.getElementsByClassName('array-bar');
            colorSortedBars(bars);
        }
    }

    async function partition(low, high) {
        const bars = document.getElementsByClassName('array-bar');
        let pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (paused) {
                await waitWhilePaused();
            }
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                bars[i].style.height = `${array[i] * 3}px`;
                bars[j].style.height = `${array[j] * 3}px`;
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        bars[i + 1].style.height = `${array[i + 1] * 3}px`;
        bars[high].style.height = `${array[high] * 3}px`;
        await new Promise(resolve => setTimeout(resolve, speed));
        return i + 1;
    }

    async function mergeSort(low = 0, high = array.length - 1) {
        timeComplexityText.textContent = 'Time Complexity: O(n log n)';
        spaceComplexityText.textContent = 'Space Complexity: O(n)';
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            await Promise.all([
                mergeSort(low, mid),
                mergeSort(mid + 1, high)
            ]);
            await merge(low, mid, high);
        }
        if (low === 0 && high === array.length - 1) {
            const bars = document.getElementsByClassName('array-bar');
            colorSortedBars(bars);
        }
    }

    async function merge(low, mid, high) {
        const bars = document.getElementsByClassName('array-bar');
        let n1 = mid - low + 1;
        let n2 = high - mid;
        let left = new Array(n1);
        let right = new Array(n2);

        for (let i = 0; i < n1; i++) left[i] = array[low + i];
        for (let j = 0; j < n2; j++) right[j] = array[mid + 1 + j];

        let i = 0, j = 0, k = low;
        while (i < n1 && j < n2) {
            if (paused) {
                await waitWhilePaused();
            }
            if (left[i] <= right[j]) {
                array[k] = left[i];
                bars[k].style.height = `${array[k] * 3}px`;
                i++;
            } else {
                array[k] = right[j];
                bars[k].style.height = `${array[k] * 3}px`;
                j++;
            }
            k++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        while (i < n1) {
            if (paused) {
                await waitWhilePaused();
            }
            array[k] = left[i];
            bars[k].style.height = `${array[k] * 3}px`;
            i++;
            k++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        while (j < n2) {
            if (paused) {
                await waitWhilePaused();
            }
            array[k] = right[j];
            bars[k].style.height = `${array[k] * 3}px`;
            j++;
            k++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    function waitWhilePaused() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (!paused) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    function colorSortedBars(bars) {
        for (let bar of bars) {
            bar.style.backgroundColor = 'khaki';
        }
    }

    generateArrayButton.addEventListener('click', () => generateArray(arraySizeSelect.value));
    startSortButton.addEventListener('click', () => {
        if (sorting) return;
        switch (algorithmSelect.value) {
            case 'bubble':
                bubbleSort();
                break;
            case 'insertion':
                insertionSort();
                break;
            case 'selection':
                selectionSort();
                break;
            case 'quick':
                quickSort();
                break;
            case 'merge':
                mergeSort();
                break;
        }
    });

    pauseSortButton.addEventListener('click', () => {
        paused = true;
    });

    resumeSortButton.addEventListener('click', () => {
        paused = false;
    });

    speedSelect.addEventListener('change', (event) => {
        speed = parseInt(event.target.value);
    });

    generateArray(arraySizeSelect.value);
});
