# Derivation for the Regular n-gon
**Goal:** Find the side length $s$ for a regular $n$-gon with an outer circumradius of $1$.

![Step 1](./proof_diagrams/ngon_step1.png)

* Let $O$ be the center of the $n$-gon.
* Let $A$ and $B$ be two adjacent vertices on the perimeter. The distance from the center to these vertices is the circumradius: $OA = OB = 1$.
* The triangle $OAB$ is an isosceles triangle. Since a full circle is $2\pi$, the central angle separating the two vertices is $\angle AOB = \frac{2\pi}{n}$.

![Step 2](./proof_diagrams/ngon_step2.png)

* Draw a line from $O$ perpendicular to the edge $AB$. This altitude bisects both the central angle and the edge $AB$.
* This creates a right triangle. The hypotenuse is $OA = 1$. The angle at the center is exactly half the central angle: $\frac{\pi}{n}$.
* The side opposite the central angle is exactly half the total edge length: $\frac{s}{2}$.

![Step 3](./proof_diagrams/ngon_step3.png)

* Using basic right-triangle trigonometry (SOH CAH TOA):
    $$\sin\left(\frac{\pi}{n}\right) = \frac{\text{Opposite}}{\text{Hypotenuse}} = \frac{s/2}{1}$$
* Solving for $s$ gives the final length:
    $$s = 2 \sin\left(\frac{\pi}{n}\right)$$
