<?php

namespace App\Entity;

use App\Repository\UsActionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UsActionRepository::class)]
class UsAction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $label = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $className = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $idTag = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isActive = null;

    #[ORM\ManyToOne(targetEntity: UsModule::class, inversedBy: 'actions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?UsModule $module = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getClassName(): ?string
    {
        return $this->className;
    }

    public function setClassName(?string $className): static
    {
        $this->className = $className;

        return $this;
    }

    public function getIdTag(): ?string
    {
        return $this->idTag;
    }

    public function setIdTag(?string $idTag): static
    {
        $this->idTag = $idTag;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(?bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getModule(): ?UsModule
    {
        return $this->module;
    }

    public function setModule(?UsModule $module): static
    {
        $this->module = $module;
        return $this;
    }
}
