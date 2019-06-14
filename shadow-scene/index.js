function init() {
    // 获取浏览器窗口的宽高，后续会用
    var width = window.innerWidth
    var height = window.innerHeight

    // 创建一个场景
    var scene = new THREE.Scene()

    // 创建一个具有透视效果的摄像机
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 800)

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 30
    camera.lookAt(scene.position)

    // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
    var renderer = new THREE.WebGLRenderer()

    // 设置渲染器的清除颜色（即绘制下一帧前填充的颜色）和输出的 canvas 的尺寸
    renderer.setClearColor(0xffffff)
    renderer.setSize(width, height)

    // 开启渲染器的阴影功能，并设置阴影的类型
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 添加聚光灯，该灯光类型可产生阴影
    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(30, 60, 40)
    // 开启该灯光的阴影效果
    spotLight.castShadow = true
    // 设置该灯光的阴影的质量
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    scene.add(spotLight)

    // 初始化摄像机插件（用于拖拽旋转摄像机，产生交互效果）
    var orbitControls = new THREE.OrbitControls(camera)
    orbitControls.autoRotate = true

    var planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1)
    // 处理此处材质不能是 THREE.MeshBasicMaterial，因为它不受光的影响，具体查看：https://github.com/mrdoob/three.js/issues/8116。另外，Three.ShadowMaterial 这种材质可以显示阴影，而无阴影部分是完全透明。具体查看：https://threejs.org/docs/index.html#api/materials/ShadowMaterial
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 该平面可接收来自其他物体的阴影
    plane.receiveShadow = true

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, -4, -10)
    scene.add(plane)

    // 创建一个长宽高均为 4 个单位长度的立方体（几何体）
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)

    // 创建材质
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    })

    // 创建一个立方体网格（mesh）：将材质包裹在几何体上
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // 设置网格位置
    cube.position.x = 0
    cube.position.y = -2
    cube.position.z = 0
    // 该立方体可产生阴影
    cube.castShadow = true
    // 将立方体网格加入到场景中
    scene.add(cube)




    // 将渲染器的输出（此处是 canvas 元素）插入到 body
    document.body.appendChild(renderer.domElement)

    // 渲染，即摄像机拍下此刻的场景
    function render() {
        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    render()
}
init()