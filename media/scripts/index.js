async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error("复制到剪贴板失败:", err);
        return false;
    }
}

document.addEventListener('click', async function (event) {
    if (event.target && event.target.classList.contains('copy-code-btn')) {
        var codeElement = event.target.closest('.code-block-container').querySelector('code');
        var code = codeElement.innerText;
        var btn = event.target;

        btn.disabled = true;
        btn.textContent = '已复制';

        if (await copyToClipboard(code)) {
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = '复制代码';
            }, 3000);
        } else {
            btn.disabled = false;
            btn.textContent = '复制代码';
            alert('复制到剪贴板失败，请手动复制。');
        }
    }
});

// document.addEventListener('mouseover', function (event) {
//     if (event.target.classList.contains('code-block-container')) {
//         var btn = event.target.querySelector('.copy-code-btn');
//         btn.style.display = 'block';
//     }
// });

// document.addEventListener('mouseout', function (event) {
//     if (event.target.classList.contains('code-block-container')) {
//         var btn = event.target.querySelector('.copy-code-btn');
//         btn.style.display = 'none';
//     }
// });