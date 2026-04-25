# The Integral Gear

This is a variation on the [$n$-gon](../index.html) integral. Same car-with-a-steering-wheel setup, but now each side of the polygon has a square bump (a tooth) rammed into it.

### The Gear: Centering the Tooth

To draw a mechanical gear, we use the **"Zero-Net-Turn"** trick for the teeth, but we must ensure the teeth are symmetric. If a tooth sits at the very end of a polygon's edge, the shape looks like an asymmetrical ratchet or saw-blade.

To make a true gear, the tooth must be centered on the edge. The sequence for a single side is:

1. Drive for half the gap ($g/2$).
2. Draw the square tooth (four $90°$ turns that cancel each other out).
3. Drive for the second half of the gap ($g/2$).
4. Turn for the macroscopic corner of the polygon ($\frac{2\pi}{n}$).

Here is the explicit integral. Notice that the macro turn is now separated into its own step ($t_5$).

$$
z(X) = \int_0^X \exp\!\left( i \sum_{r=0}^{n-1} \left[
\begin{aligned}
  & +\tfrac{\pi}{2}\sigma(x - t_1) \\
  & -\tfrac{\pi}{2}\sigma(x - t_2) \\
  & -\tfrac{\pi}{2}\sigma(x - t_3) \\
  & +\tfrac{\pi}{2}\sigma(x - t_4) \\
  & +\tfrac{2\pi}{n}\sigma(x - t_5)
\end{aligned}
\right] \right) dx
$$

The timing variables ($t$) accumulate the physical distances:

* $t_1 = g/2$
* $t_2 = t_1 + h$
* $t_3 = t_2 + w$
* $t_4 = t_3 + h$
* $t_5 = t_4 + g/2$

Inside each tooth's $r$-th repetition, $x$ is offset by $r \cdot L$ (where $L = t_5$ is one full tooth period), so every tooth fires its five sigmoids one after the next.

### What the sliders do

* **$n$** — number of teeth. Also sets the macroscopic turn $\tfrac{2\pi}{n}$.
* **$h$** — tooth height: how far the tooth pokes out.
* **$w$** — tooth width: how wide the top of the tooth is.
* **$g$** — gap: flat section between teeth (split evenly on either side of the tooth).
* **$\theta$** — sharpness. Low $\theta$ rounds every corner; high $\theta$ locks them to crisp right-angles.
