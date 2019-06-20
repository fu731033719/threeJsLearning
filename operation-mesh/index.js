function init() {
    var stats = initStats();
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);


    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);


    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


    cube.position.x = -2;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    scene.add(sphere);

    var cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
    var cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x77ff77 });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    cylinder.position.set(0, 0, 1);
    scene.add(cylinder);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);

    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var step = 0;
    var scalingStep = 0;


    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.scalingSpeed = 0.03;
        this.showRay = false;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'scalingSpeed', 0, 0.5);
    gui.add(controls, 'showRay').onChange(function (e) {
        if (tube) scene.remove(tube)
    });
    render();

    function render() {
        stats.update();
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        scalingStep += controls.scalingSpeed;
        var scaleX = Math.abs(Math.sin(scalingStep / 4));
        var scaleY = Math.abs(Math.cos(scalingStep / 5));
        var scaleZ = Math.abs(Math.sin(scalingStep / 7));
        cylinder.scale.set(scaleX, scaleY, scaleZ);

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    var tube;

    function onDocumentMouseDown(event) {

        var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);
        if (intersects.length > 0) {
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.1;
        }
    }

    function onDocumentMouseMove(event) {
        if (controls.showRay) {
            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

            if (intersects.length > 0) {

                var points = [];
                points.push(new THREE.Vector3(-30, 39.8, 30));
                points.push(intersects[0].point);

                var mat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 });
                var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 0.001);

                if (tube) scene.remove(tube);

                if (controls.showRay) {
                    tube = new THREE.Mesh(tubeGeometry, mat);
                    scene.add(tube);
                }
            }
        }
    }

    function initStats() {

        var stats = new Stats();

        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }


}
window.onload = init;